
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client"; 
import { 
  Activity, 
  FolderGit2, 
  GitPullRequest, 
  Clock,
  Settings 
} from "lucide-react";
import Link from "next/link";


const GET_ADMIN_STATS = gql`
  query GetAdminStats {
    projects {
      id
      name
      description
      projectUrl
      status
      imageUrl
      createdAt
        recentActivity {
          id
          description
        }
      }
    }
  `;

export default function AdminDashboard() {

 
  const { data } = useQuery(GET_ADMIN_STATS);

  const quickActions = [
    {
      title: "Create Project",
      href: "/admin/dashboard/projects/create",
      icon: FolderGit2,
      color: "text-pink-500"
    },
    {
      title: "Manage Projects",
      href: "/admin/dashboard/projects/list",
      icon: Settings,
      color: "text-blue-500"
    }
  ];

  interface Activity {
    id: string;
    description: string;
  }
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderGit2 className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.projectsCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.inProgressCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <GitPullRequest className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.completedCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Updates</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.recentUpdatesCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {quickActions.map((action) => (
                <Link 
                  key={action.href}
                  href={action.href}
                  className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <action.icon className={`h-5 w-5 mr-4 ${action.color}`} />
                  <span className="font-medium">{action.title}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.recentActivity?.map((activity: Activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-pink-500 mr-4" />
                  <span>{activity.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
