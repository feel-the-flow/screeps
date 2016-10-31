var roleLink = {
    run: function(current_room, spawn_link, controller_link) {
        if (spawn_link.energy>0){
            spawn_link.transferEnergy(controller_link)
        }
    }
};
module.exports = roleLink;
