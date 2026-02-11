export class Medicament {
  constructor(reference, nom, imageURL, quantiteParUnite) {
    this._reference = reference;
    this._nom = nom;
    this._imageURL = imageURL;
    this._quantiteParUnite = quantiteParUnite;
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
}
