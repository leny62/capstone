import Inquiry  from '../models/inquiry';

export const getInquiries = async (req, res)=>{
    try {
        const inquiries = await Inquiry.find();
        
        if(inquiries.length === 0){
            return res.send('No inquiries in the database').status(400) 
        }
        else {
            return res.send({
                status: 200,
                message: 'Get request',
                inquiries
            }).status(200)     
        }
    }
    catch (error) {
        res.send(error).status(500);
    }
}

export const getInquiryById = async (req, res) => {
    try {
        const _id = req.params.id;
        
        const inquiry = await Inquiry.findById(_id);
        res.json(inquiry).status(200);
    } catch (error) {
        res.json(error).status();
    }
    
}

export const createInquiry = async (req, res) => {
    try {
        const {_id, name} = req.user;
        const { author, inquiry } = req.body;
        
        const newInquiry = new Inquiry({
                author: {name, _id},
                inquiry
        });
            
        const savedInquiry = await newInquiry.save();
        res.send({'Created successfully': savedInquiry}).status(201);
    } catch (error) {
        return res.send(error).status(400);
    }
}

export const deleteInquiry = async(req,res) => {
    let {id} = req.params;
    
    try {
        const existInquiry = await Inquiry.find({_id: id})

        if (existInquiry.length) {
            const deleteInquiry = await Inquiry.deleteOne({_id: id});
            res.send({'Deleted Inquiry': existInquiry}).status(200);
        } else {
            res.json('Inquiry not found').status(404);
        }
    } catch (error) {
        res.json(error).status(500);
    }
}