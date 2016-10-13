var roleTower = {

    run: function(towers) {

        if(!towers[0].energy == 0) {
            var repair_rampart = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < 50000;}});
            var repair_road = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD ) && structure.hits < structure.hitsMax;}});
            var repair_wall = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL) && structure.hits < 50000;}});
            var repair_container = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.hits < 50000;}});
            console.log("ramparts to repair: " + repair_rampart.length + ", walls to repair: " + repair_wall.length + ",  roads to repair: " + repair_road.length);
            if(repair_road.length>0 && repair_rampart.length==0){
                towers[0].repair(repair_road[0]);
            }
            if(repair_rampart.length>0){
                towers[0].repair(repair_rampart[0]);
            }
            if(repair_wall.length>0 && repair_rampart.length==0&&repair_road.length==0){
                towers[0].repair(repair_wall[0]);
            }
            if(repair_container.length>0 && repair_rampart.length==0&&repair_road.length==0){
                towers[0].repair(repair_container[0]);
            }
            }
        }
    }

module.exports = roleTower;
