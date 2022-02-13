namespace com.sap.kwnb.stb;
// abbrebiation
// - tl: tea latte
// - es: espresso
// - fr: frappuccino
// - all: tl + es + fr

entity Orders: OrderBase {
  key OrderID: Integer;
  orderedAt: DateTime;
}

entity BaseDrinks: stbAspect {
  key ID: Integer;
  baseDrinkName: String;
}

entity TlBaseCustoms: baseCustom {
    key ID: Integer;
}

entity EsBaseCustoms: baseCustom {
    key ID: Integer;
}

entity FrBaseCustoms: baseCustom {
    key ID: Integer;
}

entity TlCustomMilks: stbAspect {
    key ID: Integer;
    tlCustomMilkName: String;
}

entity TlfrCustSyrups: stbAspect {
    key ID: Integer;
    tlfrCustSyrupName: String;
}

entity TlfrCustSyrupShots: stbAspect {
    key ID: Integer;
    tlfrCustSyrupShotName: String;
}

entity AllCustSyrups: stbAspect {
    key ID: Integer;
    allCustSyrupName: String;
}

entity AllCustSyrupShots: stbAspect {
    key ID: Integer;
    allCustSyrupShotName: String;
}

entity AllCustMilks: stbAspect {
    key ID: Integer;
    allCustMilkName: String;
}

entity AllCustToppings: stbAspect {
    key ID: Integer;
    allCustToppingName: String;
}

entity AllTemps: stbAspect {
    key ID: Integer;
    allTemp: String;
}

entity Sizes: stbAspect {
    key ID: Integer;
    sizeName: String;
}

type baseCustom: stbAspect {
    baseCustomName: String;
}

type stbAspect: {
  health: Integer;
  fatigue: Integer;
  chillTime: Integer;
  cal: Integer;
}

type OrderBase : {
    baseDrinkID        : String;
    baseDrinkName      : String;
    baseCustomID       : Integer;
    baseCustomName     : String;
    tlCustMilkID       : Integer;
    tlCustMilkName     : String;
    tlfrCustSyrupID    : Integer;
    tlfrCustSyrupName  : String;
    tlfrCustSyrupShot  : Integer;
    allCustSyrupID     : Integer;
    allCustSyrupName   : String;
    allCustSyrupShot   : Integer;
    allCustMilkID      : Integer;
    allCustMilkName    : String;
    allCustToppingID   : Integer;
    allCustToppingName : String;
    allTempID          : Integer;
    allTempName        : String;
    sizeID             : Integer;
    sizeName           : String;
    cal                : Integer;
}