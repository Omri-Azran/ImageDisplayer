import axios from 'axios'

export const getAll = async (req,res) =>{
    
    const page = req.params.page
    const category = req.params.category;   
    try {
        const resp1 = await axios.get(`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&per_page=9&page=${page}&category=${category}`)
        const defaultSort = resp1.data.hits
        res.send({
            status:200,
            statustext:'ok',
            data:defaultSort,
            messege:''
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error',
            messege:"getAllTwo went wrong" + error})
    }
}
 

export const getAllByDate = async (req,res) =>{
    
    const page = req.params.page
    const category = req.params.category;   
    try {
        const resp2 = await axios.get(`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&per_page=9&page=${page}&category=${category}&order=latest`)
        const sortedByDate = resp2.data.hits
        res.send({
            status:200,
            statustext:'ok',
            data:sortedByDate,
            messege:''
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error',
            messege:"getAllTwo went wrong" + error})
    }
}
 

export const getAllById = async (req,res) =>{
    
    const page = req.params.page
    const category = req.params.category;   
    try {
        const resp3 = await axios.get(`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&per_page=9&page=${page}&category=${category}`)


        const sortedById = resp3.data.hits.sort((a,b)=>a.id-b.id);

        res.send({
            status:200,
            statustext:'ok',
            data:sortedById,
            messege:''
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error',
            messege:"getAllTwo went wrong" + error})
    }
}