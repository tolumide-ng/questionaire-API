
// function confirmContent (req, res, next) {
//     const meetup = typeof(req.meetup) === 'string';
//     const user = typeof(req.user) === 'string';
//     const topic = typeof(req.topic) === 'string';
//     const status = (req.status === 'yes' || 'no' || 'maybe');
//     if(meetup && user && topic && status) {
//         if(!req.value) { req.value = {}; }
//         req.value['body'] = req.body;
//         next();
//     }
//     return res.status(400).json({error: `Bad content ${error.message}`})
// }

// export default confirmContent;