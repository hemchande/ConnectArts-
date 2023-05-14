import React, {useState} from 'react';
import NavBar from '../../components/navbar';

function setProfile() {
  const [genres, setGenres] = React.useState([]);
  const [role, setRole] = React.useState(null);
  const [resume, setResume] = React.useState(null);
  const [skills, setSkills] = React.useState([]);
  const [payRange, setPayRange] = useState([]);
  const [payRate, setPayRate] = useState(null)

  const [newSkill, setNewSkill] = React.useState('');

  const handleGenreChange = (event) => {
    setGenres(genres.push(event.target.value));
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  const  handleDesiredPayRangeStartChange = (event) => {
    setDesiredPayRange([event.target.value, desiredPayRange[1]]);
  }
  
  const  handleDesiredPayRangeEndChange = (event) => {
    setDesiredPayRange([desiredPayRange[0], event.target.value]);
  }

  const handleDesiredPayRateChange = (event) => {
    setDesiredPayRate(event.target.value);
  }



  const handleNewSkillChange = (event) => {
    setNewSkill(event.target.value);
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('payRate', email);
    formData.append('genres', genres);
    formData.append('payRange', desiredPayRange);
           
    formData.append('skillFields', skills);
    formData.append('payRate', desiredPayRate);

    console.log(`Genres: ${genres}`);
    console.log(`Role: ${role}`);
    console.log(`Resume: ${resume ? resume.name : ''}`);
    console.log(`Skills: ${skills.join(', ')}`);
  };

  return (
    <div>
      <NavBar />
      <h1>Edit Info</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Genre:
          <select value={genres} onChange={handleGenreChange}>
            <option value="">Select genre</option>
            <option value="jazz">Jazz</option>
            <option value="ballet">Ballet</option>
            <option value="contemporary">Contemporary</option>
            <option value="modern">Modern</option>
            <option value="fusion">Fusion</option>
            <option value="tap">Tap</option>
            <option value="hip-hop">Hip-Hop</option>
            <option value="kathak">Kathak</option>
            <option value="barathynatham">Barathynatham</option>
            <option value="African">African</option>
            <option value="ballroom">Ballroom</option>
          </select>
        </label>
        <hr />
        <label>
          Role:
          <select value={role} onChange={handleRoleChange}>
            <option value="">Select role</option>
            <option value="reviewer">Reviewer</option>
            <option value="performer">Performer</option>
            <option value="reviewer/performer">Reviewer/Performer</option>
          </select>
        </label>
        <hr />
        <label>
          Resume:
          <input type="file" accept=".pdf" onChange={handleResumeChange} />
        </label>
        <hr />
        <label>
          Set Skills:
          <input type="text" value={newSkill} onChange={handleNewSkillChange} />
          <button type="button" onClick={handleAddSkill}>
            Add
          </button>
        </label>
        <div>
          {skills.map((skill) => (
            <div key={skill} className="skill-chip">
              {skill}
              <button type="button" onClick={() => handleDeleteSkill(skill)}>
                X
              </button>
            </div>
          ))}
        </div>
        <hr />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default setProfile;
