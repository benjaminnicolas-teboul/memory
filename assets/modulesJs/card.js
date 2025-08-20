export class Card {
  constructor(id, valeur,image) {
    this.id = id;
    this.valeur = valeur;
    this.image = image;
    this.revelee = false;
  }

  retourner() {
    this.revelee = !this.revelee;
  }
}
