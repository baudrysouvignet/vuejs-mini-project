export class Medicament {
  constructor(reference, nom, imageURL, quantiteParUnite, unitesEnStock) {
    this._reference = reference;
    this._nom = nom;
    this._imageURL = imageURL;
    this._quantiteParUnite = quantiteParUnite;
    this._unitesEnStock = unitesEnStock;
  }
  get reference() {
    return this._reference;
  }
  get nom() {
    return this._nom;
  }
  get imageURL() {
    return this._imageURL;
  }
  get quantiteParUnite() {
    return this._quantiteParUnite;
  }
  get unitesEnStock() {
    return this._unitesEnStock;
  }

  set unitesEnStock(value) {
    this._unitesEnStock = value;
  }
}

