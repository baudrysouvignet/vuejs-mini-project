export class Medicament {
  constructor(reference, nom, imageURL) {
    this._reference = reference;
    this._nom = nom;
    this._imageURL = imageURL;
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
}
