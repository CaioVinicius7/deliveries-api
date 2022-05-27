interface IDeliveryResponseDTO {
  id: string;
  id_client: string;
  id_deliveryman: string | null;
  item_name: string;
  created_at: String;
  end_at: string | null;
}

export { IDeliveryResponseDTO };
