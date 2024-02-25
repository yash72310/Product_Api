const product=require('../models/product')

const getAllProducts=async(req,res)=>{
    const myData=await product.find({});
    res.status(200).json({myData});
}


const getAllProductsTesting=async(req,res)=>{
    const {company,name,sort,select}=req.query;
    const queryObject={};


    

    if(company){
        queryObject.company=company
    }
    if(name){
        queryObject.name={$regex:name,$options:"i"} // here i reresent case insensitive
    }

    let apiData=product.find(queryObject);

    if(sort){
        let sortFix=sort.replace(","," ")
        apiData=apiData.sort(sortFix)
    }
    if(select){
        let selectFix=select.split(",").join(" ");
        apiData=apiData.select(selectFix)
    }

    let page=Number(req.query.page) || 1;
    let limit=Number(req.query.limit) || 5;

    let skip=(page-1)*limit;

    apiData.skip(skip).limit(limit);


    const myData=await apiData;
    res.status(200).json({myData});
}


module.exports={getAllProducts,getAllProductsTesting}