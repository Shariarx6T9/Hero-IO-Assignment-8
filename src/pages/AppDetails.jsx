import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import appsData from "../data/apps.json";
import { installApp, isInstalled } from "../utils/localStorage";
import { toast } from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ['#22c55e', '#84cc16', '#facc15', '#fb923c', '#ef4444'];

export default function AppDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const numericId = parseInt(id, 10);
    const foundApp = appsData.find(a => a.id === numericId);
    if (foundApp) {
      setApp(foundApp);
      setInstalled(isInstalled(numericId));
    }
  }, [id]);

  const handleInstall = () => {
    if (!installed) {
      installApp(app.id);
      setInstalled(true);
      toast.success(`${app.title} installed successfully!`);
    }
  };

  if (!app) {
    return (
        <div className="text-center py-16">
            <img src="/assets/App-Error.png" alt="App not found" className="mx-auto w-64"/>
            <p className="mt-4 text-gray-600 font-semibold text-xl">OPPS!! APP NOT FOUND</p>
            <p className="text-gray-500">The App you are requesting is not on our system.</p>
            <Link to="/apps" className="mt-4 inline-block btn btn-primary">Go Back</Link>
        </div>
    );
  }
  
  const chartData = app.ratings.slice().reverse(); // To show 5 stars at the top

  return (
    <div className="container">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex justify-center">
            <img src={app.image} alt={app.title} className="w-full max-w-xs rounded-2xl shadow-lg object-cover" />
        </div>
        <div className="md:col-span-2">
            <h1 className="text-4xl font-bold">{app.title}</h1>
            <p className="text-lg text-gray-500 mb-4">{app.companyName}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-700 mb-6">
                <span>⭐ <strong>{app.ratingAvg}</strong> Average Ratings</span>
                <span><strong>{app.downloads.toLocaleString()}</strong> Downloads</span>
                <span><strong>{app.reviews.toLocaleString()}</strong> Total Reviews</span>
            </div>
            <button onClick={handleInstall} disabled={installed} className={`px-8 py-3 rounded-lg font-bold text-white ${installed ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}>
                {installed ? "Installed" : `Install Now (${app.size} MB)`}
            </button>
            
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{app.description}</p>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Ratings</h3>
                <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <BarChart layout="vertical" data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="count" barSize={20} radius={[10, 10, 10, 10]}>
                               {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}