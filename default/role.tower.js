var roleTower = {

    run: function(towers) {
        var repair_rampart = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < 50000;}});
        var repair_road = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD ) && structure.hits < structure.hitsMax;}});
        var repair_wall = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL) && structure.hits < 150000;}});
        var repair_container = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.hits < 250000;}});
        var target = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if(!towers[0].energy == 0) {
            for(var id in towers) {
                var tower = towers[id]
                if (target != undefined) {
                    tower.attack(target);
        }
            console.log("ramparts to repair: " + repair_rampart.length + ", walls to repair: " + repair_wall.length + ",  roads to repair: " + repair_road.length + ",  container to repair: " + repair_container.length);
            if(repair_rampart.length>0){

                tower.repair(repair_rampart[0]);
            }
            else if(repair_road.length>0 && repair_rampart.length==0){
                tower.repair(repair_road[0]);
            }
            else if(repair_wall.length>0 && repair_rampart.length==0&&repair_road.length==0){
                tower.repair(repair_wall[0]);
            }
            else if(repair_container.length>0 && repair_rampart.length==0&&repair_road.length==0){
                tower.repair(repair_container[0]);
            }
            }
        }


        }
    }

module.exports = roleTower;
