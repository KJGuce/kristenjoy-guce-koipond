// lib/types.ts
export interface Alm {
  id: number; // Assuming you'll have a unique ID for each resource
  name: string; // Name of the resource
  description: string; // Description of the resource
  category: string; // Category like 'Food', 'Shelter', etc.
  quantity: number; // Quantity of resources available
  location: string; // Location where the resource is available
  condition: string; // Condition of the item ('New', 'Used', etc.)
  image_url: string; // URL of the image representing the resource
  user_id: number; // User ID associated with the resource
  created_at: string; // Timestamp when the resource was created
  updated_at: string; // Timestamp when the resource was last updated
}

export interface Act {
  id: number; // Unique identifier for the act
  title: string; // Title of the act
  description: string; // Description of the act
  category: string; // Category (e.g., "Volunteer", "Health", "Donation", etc.)
  start_date: string; // Start date of the act (e.g., "2024-12-01 08:00:00")
  end_date: string; // End date of the act (e.g., "2024-12-07 18:00:00")
  is_active: boolean; // Whether the act is active or not
  user_id: number; // ID of the user associated with the act
  created_at: string; // Timestamp when the act was created
  updated_at: string; // Timestamp when the act was last updated
}

// App.tsx
export type RootStackParamList = {
  HomeScreen: undefined;
  AlmsScreen: undefined;
  ActsScreen: undefined;
  AlmsDetailsScreen: { almId: number };
  ActsDetailsScreen: { actId: number };
  PostAlmScreen: undefined;
  PostActScreen: undefined;
  Profile: undefined;
  Settings: undefined;
  // Add SearchResultsScreen
  SearchResultsScreen: { query: string };
};
