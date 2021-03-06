interface IDeliveryResponseDTO {
  id: string;
  id_client: string;
  id_deliveryman: string | null;
  item_name: string;
  initial_address: string;
  final_address: string;
  created_at: String;
  end_at: string | null;
  client?: string;
}

export { IDeliveryResponseDTO };
