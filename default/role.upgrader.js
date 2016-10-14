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
            if(creep.withdraw(controller_container, "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller_container);
            }
        }
    }
};

module.exports = roleUpgrader;
