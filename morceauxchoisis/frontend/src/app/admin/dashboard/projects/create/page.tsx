"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { useEffect, useState, ChangeEvent } from "react";
import { CREATE_PROJECT } from "@/graphql/mutations/projects";




    const CreateProject = () => {
      const { isAdmin } = useAuth();
      const router = useRouter();
      const [createProject, { loading }] = useMutation(CREATE_PROJECT);
  
      // Initialize form state
      const [formData, setFormData] = useState({
        name: "",
        description: "",
        projectUrl: "",
        imageUrl: "",
        status: "IN_PROGRESS",// Default status
      });
  
      const [imagePreview, setImagePreview] = useState<string | null>(null);
      const [file, setFile] = useState<File | null>(null);

      useEffect(() => {
        if (!isAdmin) {
          router.push('/');
        }
      }, [isAdmin, router]);

      const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const selectedFile = e.target.files[0];
          setFile(selectedFile);
      
          // Create preview
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(selectedFile);
        }
      };

      const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
        setFormData(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }));
      };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!file) {
    toast.error('Please select an image');
    return;
  }

  // Create a new File instance with the correct properties
  // const imageFile = new File(
  //   [file], 
  //   file.name, 
  //   { 
  //     type: file.type,
  //     lastModified: file.lastModified 
  //   }
  // );
  
  
  try {
    const { data } = await createProject({
      variables: {
        project: {
          name: formData.name,
          description: formData.description,
          projectUrl: formData.projectUrl,
          status: formData.status,
          image: file
        }
      },
      context: {
        headers: {
          'Apollo-Require-Preflight': 'true'
        }
      }
    });

    console.log('Created project data:', data);
    toast.success('Project created successfully');
    router.push("/admin/dashboard/projects/list");
  } catch (error) {
    console.error('Project creation error:', error);
    toast.error('Failed to create project');
  }
};    

  if (!isAdmin) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md h-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Project URL</label>
          <input
            type="url"
            name="projectUrl"
            value={formData.projectUrl}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="ON_HOLD">On Hold</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
          {imagePreview && (
            <div className="mt-4">
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={200}
                className="object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-pink-500 text-white px-6 py-2 rounded-md transition-colors
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
