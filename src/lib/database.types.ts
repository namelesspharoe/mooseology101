export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          level: string
          thumbnail_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          level: string
          thumbnail_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          level?: string
          thumbnail_url?: string | null
          created_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          video_url: string | null
          order: number
          duration: number | null
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          video_url?: string | null
          order: number
          duration?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          video_url?: string | null
          order?: number
          duration?: number | null
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          profile_id: string
          course_id: string
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          course_id: string
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          course_id?: string
          progress?: number
          created_at?: string
          updated_at?: string
        }
      }
      progress: {
        Row: {
          id: string
          profile_id: string
          lesson_id: string
          completed: boolean
          watched_seconds: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          lesson_id: string
          completed?: boolean
          watched_seconds?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          lesson_id?: string
          completed?: boolean
          watched_seconds?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}