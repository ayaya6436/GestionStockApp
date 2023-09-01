export interface Produit{
    
    id: number;
    date: Date;
    nom: String;
    description: String;
    quantite: number;
    
    }
export interface DetailProduit {
    id: number;
    date: Date;
    nom: string;
    entreeQuantite: number;
    entreePrix: number;
    entreeMontant: number;
    sortieQuantite: number;
    sortiePrix: number;
    sortieMontant: number;
    stockQuantite: number;
    stockPrix: number;
    stockMontant: number;
  }