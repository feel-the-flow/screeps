var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, controller_container) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {

            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {

            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {

            if (controller_container.length==0){

                var dropped_energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                if (creep.pickup(dropped_energy) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(dropped_energy);
                }

            }

            else if (controller_container.length>0){
            if(creep.withdraw(controller_container[0], "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller_container[0]);
            }
        }
    }
    }
};

module.exports = roleUpgrader;
