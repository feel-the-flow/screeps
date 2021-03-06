var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, controller_container, current_room, controller_link, spawn_container) {

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

                if (creep.pickup(dropped_energy[0]) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(dropped_energy[0]);
                }

            }

            else if (controller_container[0].store[RESOURCE_ENERGY]==0 && dropped_energy.length>0){

                if (creep.pickup(dropped_energy[0]) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(dropped_energy[0]);
                }
            }
            else if(dropped_energy==0 && controller_link!=null && controller_link.energy>0){

                if (creep.withdraw(controller_link, "energy") == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(controller_link);
                }
            }
            else if (controller_container.length==0 && dropped_energy.length==0 && current_room.storage!=undefined){

                if (creep.withdraw(current_room.storage, "energy") == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(current_room.storage);
                }

            }
            else if (controller_container[0].store[RESOURCE_ENERGY]==0 &&  dropped_energy.length==0 && current_room.storage==undefined){

                if (creep.withdraw(spawn_container, "energy") == ERR_NOT_IN_RANGE) {
                    console.log(spawn_container)
                    // move towards the source
                    creep.moveTo(spawn_container);
                }

            }
            else if (controller_container.length>0){
                console.log("HEELO")
            if(creep.withdraw(controller_container[0], "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller_container[0]);
            }
        }
    }
    }
};

module.exports = roleUpgrader;
