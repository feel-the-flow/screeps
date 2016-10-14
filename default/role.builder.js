var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, spawn_container) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
            if(creep.withdraw(spawn_container[0], "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn_container[0]);
            }
        }
    }
};

module.exports = roleBuilder;
