'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, gql } from "@apollo/client";
import { DELETE_PROJECT_WITH_KEY } from "@/graphql/mutations/projects";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { useState } from "react";
import { 
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent, 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { debounce } from "lodash";


const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      imageUrl
      projectUrl
      status
      createdAt
    }
  }
`;

const ProjectsList = () => {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { loading, error, data } = useQuery<{ projects: Project[] }>(
    GET_PROJECTS
  );

  //Add the admin key
  const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;

  const [deleteProjectWithKey] = useMutation(DELETE_PROJECT_WITH_KEY, {
    refetchQueries: [{ query: GET_PROJECTS }]
  });

  if (!isAdmin) {
    router.push('/dashboard');
    return null;
  }

  const filteredProjects = data?.projects.filter((project: { name: string; status: string }) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // const handleDelete = debounce(async (id: string) => {
  //   console.log(`deleteProject output : ${id}`);
  //   if (window.confirm('Are you sure you want to delete this project?')) {
  //     try {
  //       // console.log("deleteProject output :", deleteProject); 
  //       await deleteProject({ variables: { id } }); 
        
  //       toast.success('Project deleted successfully');
  //     } catch (error) {
  //       toast.error('Failed to delete project');
  //     }
  //   }
  // }, 300);
  
  // const handleDelete = async (id: string) => {
  //   if (window.confirm('Are you sure you want to delete this project?')) {
  //     try {
  //       await deleteProject({ variables: { id } });
  //       toast.success('Project deleted successfully');
  //     } catch (error) {
  //       toast.error('Failed to delete project');
  //     }
  //   }
  // };

//   const handleDelete = async (id: string) => {
//     console.log('Admin Key:', process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY);
//   // Track when the handler starts
//   const startTime = performance.now();
  
//   try {
//     // Use a non-blocking confirmation approach (optional)
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       // Show immediate feedback
//       toast.info('Deleting project...');
      
//       // Execute the mutation
//       await deleteProjectWithKey({ 
//         variables: { 
//           id,
//           adminKey: process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY
//         } 
//       });
      
//       toast.success('Project deleted successfully');
//       console.log(`Operation took ${performance.now() - startTime}ms`);
//     }
//   } catch (error) {
//     toast.error('Failed to delete project');
//     console.error(error);
//   }
// };


 const handleDelete = debounce(async (id: string) => {
    const adminKey = prompt('Please enter the admin key:');
    if (adminKey && window.confirm('Are you sure you want to delete this project?')) {
      try {
        const { data } = await deleteProjectWithKey({ variables: { id, adminKey } });
        if (data.deleteProjectWithKey) {
          toast.success('Project deleted successfully');
        } else {
          toast.error('Failed to delete project');
        }
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  }, 300);


  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <Button
          onClick={() => router.push('/admin/dashboard/projects/create')}
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
        >
          Create New Project
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          className="p-2 border rounded-md flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="ALL">All Status</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">Error loading projects</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects?.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader>
              {project.imageUrl && (
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  width={400}
                  height={200}
                  priority={true}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <CardTitle>{project.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <span className={`px-3 py-1 rounded-full text-sm ${
                project.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                project.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => router.push(`/admin/dashboard/projects/edit/${project.id}`)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(project.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;