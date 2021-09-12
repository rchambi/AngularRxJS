interface PortFolio {
  portfolio_id: string;
  portfolio_descripcion: string;
  user_id: number;
  items: Array<PortFolioItem>;
}

interface PortFolioItem {
  item_quantidade: number;
  item_precio: number;
  acciones_id: number;
}
