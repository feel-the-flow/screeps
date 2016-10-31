var roleMover2 = {

    /** @param {Creep} creep **/
    run: function(creep, spawn_container_d, current_room)
    {
        var dropped_energy = creep.room.find(FIND_DROPPED_ENERGY);
        var containers =Game.getObjectById( current_room.memory.source_containers[creep.memory.source])
    }
};

module.exports = roleMover2;
