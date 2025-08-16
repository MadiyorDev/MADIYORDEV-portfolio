import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import './Admin.scss';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false); // PIN tekshiruv uchun
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const [project, setProject] = useState({
    title: '',
    images: ['', '', ''],
    tags: '',
    description: '',
    liveDemo: '',
    github: ''
  });

  // LocalStorage dan ma'lumot olish
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(saved);

    const dark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(dark);
    if (dark) document.body.classList.add('dark');
  }, []);

  // Dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('dark', newMode);
  };

  // PIN tekshiruv
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === "200830") { 
      setIsAuthorized(true);
      setError("");
    } else {
      setError("❌ Noto‘g‘ri PIN!");
      setPin("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...project.images];
      newImages[index] = reader.result;
      setProject({ ...project, images: newImages });
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    let savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const newProject = {
      ...project,
      tags: project.tags.split(',').map(tag => tag.trim()),
    };
    savedProjects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(savedProjects));
    setProjects(savedProjects);
    alert('✅ Project qo‘shildi!');
    setProject({ title: '', images: ['', '', ''], tags: '', description: '', liveDemo: '', github: '' });
  };

  const handleDelete = (index) => {
    let updated = [...projects];
    updated.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(updated));
    setProjects(updated);
  };

  // Agar authorized bo'lmasa PIN kirish oynasini ko'rsatamiz
  if (!isAuthorized) {
    return (
      <div className="pin-wrapper">
        <form className="pin-box" onSubmit={handlePinSubmit}>
          <h2>Kirish uchun PIN kiriting</h2>
          <input
            type="password"
            inputMode="numeric"
            maxLength="6"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">✅ Tasdiqlash</button>
        </form>
      </div>
    );
  }

  // Agar PIN to‘g‘ri bo‘lsa, Admin panelni ko‘rsatamiz
  return (
    <div className="admin">
      <div className="admin__header">
        <h2 className="admin__title">Yangi Project qo‘shish</h2>
        <button className="dark-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
      </div>

      <div className="admin__form">
        <input type="text" name="title" placeholder="Project nomi" value={project.title} onChange={handleChange} />
        <textarea name="description" placeholder="Tavsif" value={project.description} onChange={handleChange}></textarea>
        <input type="text" name="tags" placeholder="Taglar (vergul bilan)" value={project.tags} onChange={handleChange} />
        <input type="text" name="liveDemo" placeholder="Live Demo link" value={project.liveDemo} onChange={handleChange} />
        <input type="text" name="github" placeholder="GitHub link" value={project.github} onChange={handleChange} />

        <p>Rasm yuklash (3ta):</p>
        <div className="admin__form-images">
          {project.images.map((img, idx) => (
            <div key={idx} className="img-upload">
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
              {img && <img src={img} alt={`preview-${idx}`} />}
            </div>
          ))}
        </div>

        <button onClick={handleAdd}>➕ Qo‘shish</button>
      </div>

      <h2 className="admin__title">Mavjud Projectlar</h2>
      <div className="admin__list">
        {projects.map((p, idx) => (
          <div key={idx} className="project-card">
            <h4>{p.title}</h4>
            <button onClick={() => handleDelete(idx)}>❌ O‘chirish</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
