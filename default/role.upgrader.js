var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, controller_container, current_room) {
        var dropped_energy = creep.room.find(FIND_DROPPED_ENERGY);
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

            if (controller_container.length==0 && dropped_energy.length>0){


                if (creep.pickup(dropped_energy) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(dropped_energy);
                }

            }
            else if (controller_container.length==0 && dropped_energy.length==0){
                if (creep.withdraw(current_room.storage, "energy") == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(current_room.storage);
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
