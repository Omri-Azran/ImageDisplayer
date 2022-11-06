import { useEffect,useState, useRef} from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/*
attempt at redux

import handlePhotoReducer from '../../features/handlePhotos.slice'
import { useDispatch, useSelector } from 'react-redux'
*/

import './home.css'
const Home = ()=>{

    
    /*
    attempt at redux
    
    const dispatch = useDispatch();
    const handlePhotos = useSelector(state => state.handlePhotos.value)
    */


    //maybe I should have used useReducer here to begin with, 
   //but I thought converting the project to redux at the end would be smarter.
   //It wasnt, as I didnt manage to convert it on time

    //used in he button that shows the modal for the category
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const CloseCategoryModal = () => setShowCategoryModal(false);
    const ShowCategoryModal = () => setShowCategoryModal(true);
       
    //same as above but for the image modal
    const [showImageModal, setShowImageModal] = useState(false);
    const CloseImageModal = () => setShowImageModal(false);
   
    //holds the data of all the photos
    const [photosData, SetPhotosData] = useState([])

    //holds the data of a single photos, after being extracted from PhotosData
    const [singlePhotoData, setSinglePhotoData] = useState([])
    
    
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
            
            SetPhotosData(allPhotosData)
            
            console.log(allPhotosData);
            /*
            attempt at redux

            dispatch(allPhotosData)
            */
        
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
        setShowCategoryModal(false);
    }

    const displaySinglePhotoData = (event) =>{
        setSinglePhotoData(
                //find a photo based on its URL
                photosData.find(id=>id.largeImageURL === event.target.src))
        setShowImageModal(true)
    }

    return(
    <div className="all">
        <div className="buttons">

        <Button onClick={getPrevPage}>Prev</Button>
        
        <Button variant="primary" onClick={ShowCategoryModal}>
        Choose Category
        </Button>

        <Button onClick={getNextPage}>Next</Button>

        </div>
                

        <Modal show={showCategoryModal} onHide={CloseCategoryModal}>
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
        <Modal show={showImageModal} onHide={CloseImageModal}>
            <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Id: {singlePhotoData.id}
            <br/>
               Tags: {singlePhotoData.tags}
            <br/>
               Views: {singlePhotoData.views}
            <br/>
               Downloads: {singlePhotoData.downloads}
            <br/>
               Collections: {singlePhotoData.collections}
            <br/>
               Likes: {singlePhotoData.likes}
            <br/>
               Comments : {singlePhotoData.comments}      
            <br/>
            </Modal.Body>

        </Modal>

    </div>
    )
}

export default Home;