var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, room_source_container) {
        var container =Game.getObjectById( room_source_container[creep.memory.source])
        //console.log(container)
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source]);
            }
        }
        else {
            if(container.store[RESOURCE_ENERGY]<container.storeCapacity){
            creep.transfer(container, RESOURCE_ENERGY)
        }
        else{
            creep.drop('energy', creep.carryCapacity)
        }
        }
    }
};

module.exports = roleHarvester;
