const cds = require('@sap/cds');

// class CatalogService extends cds.ApplicationService { async init(){
//   const db = await cds.connect.to ('db')
//   const { Orders, BaseDrinks, Books } = db.entities ('com.sap.kwnb.stb')

//   this.on('READ', 'Orders', async (req, next) => {
//       var resArr = [{baseDrinkID: 1}];
//       console.log("xx");
//       var response = await db.run(SELECT.from(Books));
//       console.log("yy");
//       var response2 = await db.run(SELECT.from(Books));
//       await db.run(req.query);
//       console.log(req.query);
//       console.log("zz");
//       console.log(response);
//       next();
//   })
// //   this.on ('submitOrder', async req => {
// //     const {book,quantity} = req.data
// //     let {stock} = await db.read (Books,book, b => b.stock)
// //     if (stock >= quantity) {
// //       await db.update (Books,book) .with ({ stock: stock -= quantity })
// //       await this.emit ('OrderedBook', { book, quantity, buyer:req.user.id })
// //       return req.reply ({ stock })
// //     }
// //     else return req.error (409,`${quantity} exceeds stock for book #${book}`)
// //   })

//   this.after ('READ','Books', each => {
//     if (each.stock > 111) each.title += ` -- 11% discount!`
//   })

// }}

// module.exports = { CatalogService }