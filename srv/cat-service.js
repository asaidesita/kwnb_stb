const cds = require('@sap/cds');

class CatalogService extends cds.ApplicationService {
    async init() {
        const db = await cds.connect.to('db')
        const { BaseDrinks, TlBaseCustoms, EsBaseCustoms, FrBaseCustoms, TlCustomMilks,
            TlfrCustSyrups, TlfrCustSyrupShots, AllCustSyrups, AllCustSyrupShots, AllCustMilks,
            AllCustToppings, Sizes, AllTemps } = db.entities('com.sap.kwnb.stb')

        this.on('getStbRecommendation', async req => {
            const { health, fatigue, baseType, chillTime } = req.data;
            console.log(health + ", " + fatigue + ", " + baseType + ", " + chillTime);
            var baseDrink = await db.run(SELECT.from(BaseDrinks).where({ ID: baseType }));
            if (baseDrink.length == 0) req.error(500, 'baseType might be invalid');
            console.log(baseDrink);

            // select best base custom
            var bestBaseCustom = {baseCustomID: null, baseCustomName: null, cal: 0};
            const [teaLatteBaseId, EspressoBaseId, FrappuccinoBaseId] = [0, 1, 2];
            if (baseDrink[0].ID == teaLatteBaseId) {
                bestBaseCustom = await bestBaseCustomPicker(health, fatigue, chillTime, TlBaseCustoms);
            } else if (baseDrink[0].ID == EspressoBaseId) {
                bestBaseCustom = await bestBaseCustomPicker(health, fatigue, chillTime, EsBaseCustoms);
            } else if (baseDrink[0].ID == FrappuccinoBaseId) {
                bestBaseCustom = await bestBaseCustomPicker(health, fatigue, chillTime, FrBaseCustoms);
            }
            console.log(bestBaseCustom);

            // select best tea latte milk custom
            var bestTeaLatteMilkCustom = {tlCustMilkID: null, tlCustMilkName: null, cal: 0};
            if (baseDrink[0].ID == teaLatteBaseId) {
                bestTeaLatteMilkCustom = await bestTeaLatteMilkCustomPicker(health, fatigue, chillTime);
            }
            console.log(bestTeaLatteMilkCustom);

            // select best tea latte and Frappuccino syrup type
            var bestTlfrSyrupCustom = {tlfrCustSyrupID: null, tlfrCustSyrupName: null, cal: 0};
            if(baseDrink[0].ID == teaLatteBaseId || baseDrink[0].ID == FrappuccinoBaseId) {
                bestTlfrSyrupCustom = await bestTlfrSyrupCustomPicker(health, fatigue, chillTime);
            }
            console.log(bestTlfrSyrupCustom);

            // select best tea latte and Frappuccino syrup shot
            var bestTlfrSyrupShotCustom = {tlfrCustSyrupShotID: null, tlfrCustSyrupShotName: null, cal: 0};
            if(baseDrink[0].ID == teaLatteBaseId || baseDrink[0].ID == FrappuccinoBaseId) {
                bestTlfrSyrupShotCustom = await bestTlfrSyrupShotCustomPicker(health, fatigue, chillTime);
            }
            console.log(bestTlfrSyrupShotCustom);

            // select best syrup type
            var bestAllSyrupCustom = {allCustSyrupID: null, allCustSyrupName: null, cal: 0};
            bestAllSyrupCustom = await bestAllSyrupCustomPicker(health, fatigue, chillTime);
            console.log(bestAllSyrupCustom);

            // select best syrup shot
            var bestAllSyrupShotCustom = {allCustSyrupShotID: null, allCustSyrupShotName: null, cal: 0};
            bestAllSyrupShotCustom = await bestAllSyrupShotCustomPicker(health, fatigue, chillTime);
            console.log(bestAllSyrupShotCustom);

            // select best milk
            var bestAllMilkCustom = {allCustMilkID: null, allCustMilkName: null, cal: 0};
            bestAllMilkCustom = await bestAllMilkCustomPicker(health, fatigue, chillTime);
            console.log(bestAllMilkCustom);

            // select best topping
            var bestAllToppigCustom = {allCustToppingID: null, allCustToppingName: null, cal: 0};
            bestAllToppigCustom = await bestAllToppingCustomPicker(health, fatigue, chillTime);
            console.log(bestAllToppigCustom);

            // select best size
            var bestAllSizeCustom = {sizeID: null, sizeName: null, cal: 0};
            bestAllSizeCustom = await bestAllSizeCustomPicker(health, fatigue, chillTime);
            console.log(bestAllSizeCustom);

            // select best temparature
            var bestAllTempCustom = {allTempID: null, allTempName: null, cal: 0};
            bestAllTempCustom = await bestAllTempCustomPicker(health, fatigue, chillTime);
            console.log(bestAllTempCustom);

            var totalCal = (baseDrink[0].cal 
                + bestBaseCustom.cal 
                + bestTeaLatteMilkCustom.cal
                + bestTlfrSyrupCustom.cal
                + bestTlfrSyrupShotCustom.cal
                + bestAllSyrupCustom.cal
                + bestAllSyrupShotCustom.cal
                + bestAllMilkCustom.cal
                + bestAllToppigCustom.cal
                + bestAllTempCustom.cal
                ) * bestAllSizeCustom.cal / 100;

            return req.reply({
                "baseDrinkID": baseType,
                "baseDrinkName": baseDrink[0].baseDrinkName,
                "baseCustomID": bestBaseCustom.baseCustomID,
                "baseCustomName": bestBaseCustom.baseCustomName,
                "tlCustMilkID": bestTeaLatteMilkCustom.tlCustMilkID,
                "tlCustMilkName": bestTeaLatteMilkCustom.tlCustMilkName,
                "tlfrCustSyrupID": bestTlfrSyrupCustom.tlfrCustSyrupID,
                "tlfrCustSyrupName": bestTlfrSyrupCustom.tlfrCustSyrupName,
                "tlfrCustSyrupShotID": bestTlfrSyrupShotCustom.tlfrCustSyrupShotID,
                "tlfrCustSyrupShotName": bestTlfrSyrupShotCustom.tlfrCustSyrupShotName,
                "allCustSyrupID": bestAllSyrupCustom.allCustSyrupID,
                "allCustSyrupName": bestAllSyrupCustom.allCustSyrupName,
                "allCustSyrupShotID": bestAllSyrupShotCustom.allCustSyrupShotID,
                "allCustSyrupShotName": bestAllSyrupShotCustom.allCustSyrupShotName,
                "allCustMilkID": bestAllMilkCustom.allCustMilkID,
                "allCustMilkName": bestAllMilkCustom.allCustMilkName,
                "allCustToppingID": bestAllToppigCustom.allCustToppingID,
                "allCustToppingName": bestAllToppigCustom.allCustToppingName,
                "allTempID": bestAllTempCustom.allTempID,
                "allTempName": bestAllTempCustom.allTempName,
                "sizeID": bestAllSizeCustom.sizeID,
                "sizeName": bestAllSizeCustom.sizeName,
                "cal": totalCal,
            });
        })

        super.init();

        const estimatedWorstScore = 75;
        async function bestBaseCustomPicker(health, fatigue, chillTime, baseCustom) {
            var baseCustoms = await db.run(SELECT.from(baseCustom));
            var bestScoreMap = scoreCalculator(health, fatigue, chillTime, baseCustoms);

            return { 
                    baseCustomID: baseCustoms[bestScoreMap.index].ID, 
                    baseCustomName: baseCustoms[bestScoreMap.index].baseCustomName, 
                    cal: baseCustoms[bestScoreMap.index].cal 
                };
        }

        async function bestTeaLatteMilkCustomPicker(health, fatigue, chillTime) {
            var customMilks = await db.run(SELECT.from(TlCustomMilks));
            var bestScoreMap = scoreCalculator(health, fatigue, chillTime, customMilks);

            return { 
                    tlCustMilkID: customMilks[bestScoreMap.index].ID, 
                    tlCustMilkName: customMilks[bestScoreMap.index].tlCustomMilkName ,
                    cal: customMilks[bestScoreMap.index].cal
                };
        }

        async function bestTlfrSyrupCustomPicker(health, fatigue, chillTime) {
            var customList = await db.run(SELECT.from(TlfrCustSyrups));
            var bestScoreMap = scoreCalculator(health, fatigue, chillTime, customList);

            return { 
                    tlfrCustSyrupID: customList[bestScoreMap.index].ID, 
                    tlfrCustSyrupName: customList[bestScoreMap.index].tlfrCustSyrupName ,
                    cal: customList[bestScoreMap.index].cal
                };
        }

        async function bestTlfrSyrupShotCustomPicker(health, fatigue, chillTime) {
            var customList = await db.run(SELECT.from(TlfrCustSyrupShots));
            var bestScoreMap = scoreCalculator(health, fatigue, chillTime, customList);

            return { 
                    tlfrCustSyrupShotID: customList[bestScoreMap.index].ID, 
                    tlfrCustSyrupShotName: customList[bestScoreMap.index].tlfrCustSyrupShotName ,
                    cal: customList[bestScoreMap.index].cal
                };
        }

        async function bestAllSyrupCustomPicker(health, fatigue, chillTime) {
            var customList = await db.run(SELECT.from(AllCustSyrups));
            var bestScoreMap = scoreCalculator(health, fatigue, chillTime, customList);

            return { 
                    allCustSyrupID: customList[bestScoreMap.index].ID, 
                    allCustSyrupName: customList[bestScoreMap.index].allCustSyrupName ,
                    cal: customList[bestScoreMap.index].cal
                };
        }
        
        async function bestAllSyrupShotCustomPicker(health, fatigue, chillTime) {
            var customList = await db.run(SELECT.from(AllCustSyrupShots));
            var bestScoreMap = scoreCalculator(health, fatigue, chillTime, customList);

            return { 
                    allCustSyrupShotID: customList[bestScoreMap.index].ID, 
                    allCustSyrupShotName: customList[bestScoreMap.index].allCustSyrupShotName ,
                    cal: customList[bestScoreMap.index].cal
                };
        }

        async function bestAllMilkCustomPicker(health, fatigue, chillTime) {
            var customList = await db.run(SELECT.from(AllCustMilks));
            var bestScoreMap = scoreCalculator(health, fatigue, chillTime, customList);

            return { 
                    allCustMilkID: customList[bestScoreMap.index].ID, 
                    allCustMilkName: customList[bestScoreMap.index].allCustMilkName ,
                    cal: customList[bestScoreMap.index].cal
                };
        }

        async function bestAllToppingCustomPicker(health, fatigue, chillTime) {
            var customList = await db.run(SELECT.from(AllCustToppings));
            var bestScoreMap = scoreCalculator(health, fatigue, chillTime, customList);

            return { 
                    allCustToppingID: customList[bestScoreMap.index].ID, 
                    allCustToppingName: customList[bestScoreMap.index].allCustToppingName ,
                    cal: customList[bestScoreMap.index].cal
                };
        }

        async function bestAllSizeCustomPicker(health, fatigue, chillTime) {
            var customList = await db.run(SELECT.from(Sizes));
            var bestScoreMap = scoreCalculator(health, fatigue, chillTime, customList);

            return { 
                    sizeID: customList[bestScoreMap.index].ID, 
                    sizeName: customList[bestScoreMap.index].sizeName ,
                    cal: customList[bestScoreMap.index].cal
                };
        }

        async function bestAllTempCustomPicker(health, fatigue, chillTime) {
            var customList = await db.run(SELECT.from(AllTemps));
            var bestScoreMap = scoreCalculator(health, fatigue, chillTime, customList);

            return { 
                    allTempID: customList[bestScoreMap.index].ID, 
                    allTempName: customList[bestScoreMap.index].allTempName ,
                    cal: customList[bestScoreMap.index].cal
                };
        }

        function scoreCalculator(health, fatigue, chillTime, customList) {
            var bestScoreMap = {
                score: estimatedWorstScore,
                index: -1
            }
            for (const index in customList) {
                const { health: bcHealth, fatigue: bcFatigue, chillTime: bcChillTime } = customList[index];
                var bcScore = (bcHealth - health) ** 2 + (bcFatigue - fatigue) ** 2 + (bcChillTime - chillTime) ** 2 / 25;
                console.log(bcScore);
                if (bestScoreMap.score > bcScore) {
                    bestScoreMap.score = bcScore;
                    bestScoreMap.index = index;
                }
            }
            return bestScoreMap;
        }
    }
}

module.exports = { CatalogService }