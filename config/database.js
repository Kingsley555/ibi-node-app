if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb://kingsley:ballack02@ds019488.mlab.com:19488/ibi-db'}
} else{
 module.exports = {mongoURI: 'mongodb://127.0.0.1:27017/ibi-db'}
}