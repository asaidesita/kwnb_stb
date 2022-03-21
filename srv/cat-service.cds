using com.sap.kwnb.stb as kwnbstb from '../db/data-model';

@requires: 'authenticated-user'
service CatalogService {
    entity Orders as projection on kwnbstb.Orders;

    action getStbRecommendation(
            health: Integer, 
            fatigue: Integer, 
            baseType: Integer, 
            chillTime: Integer) 
        returns kwnbstb.OrderBase;

    entity BaseDrinks as projection on kwnbstb.BaseDrinks;
}