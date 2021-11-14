module.exports = async(queue, tracks, client) => {

    queue.metadata.editReply(`Tracks Enqueued ${tracks.length}\nSource: ${tracks.source}`).then(async(msg)=>{
        setTimeout(function(){
            msg.delete();
        }, 10000);
    })

};