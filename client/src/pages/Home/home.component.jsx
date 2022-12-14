import { useEffect,useState, useRef} from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCategoryModal } from '../../features/handleCategoryModal.slice'
import { setImageModal } from '../../features/handleImageModal.slice'
import { setPhotosData } from "../../features/handlePhotos.slice";
import { setSinglePhoto } from "../../features/handleSinglePhoto.slice";
import { useDispatch, useSelector } from 'react-redux'


import './home.css'
const Home = ()=>{

    
    //states of the different modals
    const categoryModal = useSelector(state => state.handleCategoryModal.value)
    const imageModal = useSelector(state => state.handleImageModal.value)   

    //a collection of all the photos
    const photosData = useSelector(state => state.handlePhotosData.value)

    //a collection of all the data of a single photo
    const singlePhoto = useSelector(state => state.handleSinglePhoto.value)

    const dispatch = useDispatch();
    
    //functions to close/open said modals
    const closeCategoryModal = () => dispatch(setCategoryModal(false))
    const openCategoryModal = () => dispatch(setCategoryModal(true))
    const closeImageModal = () => dispatch(setImageModal(false))
    
    const params = useParams();
    
    //holds the page consistently between renders
    const currentPage = useRef(1);

    //assign it to a query param named "page"
    params.page = currentPage;
    
    //same as above, for categories
    const currentCategory = useRef("backgrounds");
    params.category = currentCategory;


    const getAll = async ()=> {

        //get data from params and pass it to the server
        const page = params.page;
        const category = params.category;

        try {
            const response = await fetch (`http://localhost:3000/all/${page}/${category}/byId`)
            if (!response.ok) {
                throw new Error();
            }
            const responseObj = await response.json();
            const allPhotosData = responseObj.data
                       
            dispatch(setPhotosData(allPhotosData))


        
        } 
        catch (error) {
            console.log(error);
        }
    }

    //first render
    useEffect(()=>{
        getAll();
    },[])

    
    const getNextPage = ()=> {
        
        //increment page
        currentPage.current++
        params.page = currentPage.current
        
        //gets category to stay the same
        params.category = currentCategory.current.toLowerCase();
        getAll();
    }


    const getPrevPage =()=>{
        //prevents the page from going to 0 
        if(currentPage.current > 1){
            currentPage.current--;
        }  
        else{
            return;
        } 
        params.page = currentPage.current
        params.category = currentCategory.current.toLowerCase();
        getAll();
    }

    const changeCategory = (event) =>{
        //gets category from the dropdown 
        currentCategory.current = event.target.value
        params.category = currentCategory.current.toLowerCase();
        //resets page back to 1
        currentPage.current = 1
        getAll();
        dispatch(setCategoryModal(false))
    }

    const displaySinglePhotoData = (event) =>{
        dispatch(setSinglePhoto(
                //find a photo based on its URL
                photosData.find(id=>id.largeImageURL === event.target.src)))

        dispatch(setImageModal(true))
    }

    return(
    <div className="all">
        <div className="buttons">

        <Button onClick={getPrevPage}>Prev</Button>
        
        <Button variant="primary" onClick={openCategoryModal}>
        Choose Category
        </Button>

        <Button onClick={getNextPage}>Next</Button>

        </div>
                

        <Modal show={categoryModal} onHide={closeCategoryModal}>
            <Modal.Header closeButton>
            <Modal.Title>Choose a category</Modal.Title>
            </Modal.Header>
            <Modal.Body>Choose a category from the list:  
                <select onChange={changeCategory}>
                    <option></option>
                    <option>Art</option>
                    <option>Backgrounds</option>
                    <option>Fashion</option>
                    <option>Nature</option>
                    <option>Science</option>
                    <option>Education</option>
                    <option>Feelings</option>
                    <option>Health</option>
                    <option>People</option>
                    <option>Religion</option>
                    <option>Places</option>
                    <option>Animals</option>
                    <option>Industry</option>
                    <option>Computer</option>
                    <option>Food</option>
                    <option>Sports</option>
                    <option>Transportation</option>
                    <option>Travel</option>
                    <option>Buildings</option>
                    <option>Business</option>
                    <option>Music</option>
                </select>
            </Modal.Body>
        </Modal>


        {/* display all photos on grid */}
        <div  
        className="image-grid"
        >
        {photosData.map(data=>
            <img 
            src={data.largeImageURL}
            onClick={displaySinglePhotoData}
            className={"image"}
            key={data.id}
            />
            )}
        </div>

        {/* shows relevant data. 
        I could show all of data by converting the singlePhotoData object to an array and mapping through it but I thought it wasnt necessary */}
        <Modal show={imageModal} onHide={closeImageModal}>
            <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Id: {singlePhoto.id}
            <br/>
               Tags: {singlePhoto.tags}
            <br/>
               Views: {singlePhoto.views}
            <br/>
               Downloads: {singlePhoto.downloads}
            <br/>
               Collections: {singlePhoto.collections}
            <br/>
               Likes: {singlePhoto.likes}
            <br/>
               Comments : {singlePhoto.comments}      
            <br/>
            </Modal.Body>

        </Modal>

    </div>
    )
}

export default Home;