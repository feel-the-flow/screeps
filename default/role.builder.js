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
            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }

        }

        else {
            if (spawn_container.length==0){
                var dropped_energy = creep.room.find(FIND_DROPPED_ENERGY);
                if (creep.pickup(dropped_energy[0]) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(dropped_energy[0]);
                }

            }
            else if (spawn_container.length!=0){
            if(creep.withdraw(spawn_container[0], "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn_container[0]);
            }
        }
        }
    }
};

module.exports = roleBuilder;
