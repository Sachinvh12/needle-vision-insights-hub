export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      battlecards: {
        Row: {
          feed_id: string
          id: string
          importance: string
          key_takeaways: Json
          summary: string
          timestamp: string
          title: string
          type: string
        }
        Insert: {
          feed_id: string
          id?: string
          importance: string
          key_takeaways?: Json
          summary: string
          timestamp?: string
          title: string
          type: string
        }
        Update: {
          feed_id?: string
          id?: string
          importance?: string
          key_takeaways?: Json
          summary?: string
          timestamp?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "battlecards_feed_id_fkey"
            columns: ["feed_id"]
            isOneToOne: false
            referencedRelation: "intelligence_feeds"
            referencedColumns: ["id"]
          },
        ]
      }
      intelligence_feeds: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          last_updated: string
          name: string
          type: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          last_updated?: string
          name: string
          type: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          last_updated?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      metrics: {
        Row: {
          alerts_count: number
          date: string
          document_source_percentage: number
          id: string
          web_source_percentage: number
        }
        Insert: {
          alerts_count?: number
          date: string
          document_source_percentage?: number
          id?: string
          web_source_percentage?: number
        }
        Update: {
          alerts_count?: number
          date?: string
          document_source_percentage?: number
          id?: string
          web_source_percentage?: number
        }
        Relationships: []
      }
      sources: {
        Row: {
          battlecard_id: string
          document_link: string | null
          id: string
          name: string
          type: string
          url: string | null
        }
        Insert: {
          battlecard_id: string
          document_link?: string | null
          id?: string
          name: string
          type: string
          url?: string | null
        }
        Update: {
          battlecard_id?: string
          document_link?: string | null
          id?: string
          name?: string
          type?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sources_battlecard_id_fkey"
            columns: ["battlecard_id"]
            isOneToOne: false
            referencedRelation: "battlecards"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          count: number
          id: string
          name: string
        }
        Insert: {
          count?: number
          id?: string
          name: string
        }
        Update: {
          count?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
