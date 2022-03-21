using com.sap.kwnb.stb as kwnbstb from '../db/data-model';

@requires: 'admin'
service AdminService {
    entity Orders as projection on kwnbstb.Orders;
    entity BaseDrinks as projection on kwnbstb.BaseDrinks;
}