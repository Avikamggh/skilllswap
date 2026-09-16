import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { SKILL_CATEGORIES } from '../data/initialSkills';
import { X, Plus, Check, Sparkles, User, Briefcase, Calendar, Target, Globe } from 'lucide-react';

export default function ProfileModal() {
  const { currentUser, updateProfile, isProfileModalOpen, setIsProfileModalOpen } = useSwap();

  const [formData, setFormData] = useState({
    name: currentUser.name,
    title: currentUser.title,
    bio: currentUser.bio,
    canTeach: [...(currentUser.canTeach || [])],
    wantsToLearn: [...(currentUser.wantsToLearn || [])],
    availability: [...(currentUser.availability || [])],
    mode: currentUser.mode || 'Online',
    goals: [...(currentUser.goals || [])]
  });

  const [newTeachSkill, setNewTeachSkill] = useState('');
  const [newLearnSkill, setNewLearnSkill] = useState('');

  if (!isProfileModalOpen) return null;

  const allAvailabilitySlots = [
    'Weekday Mornings',
    'Weekday Afternoons',
    'Weekday Evenings',
    'Weekend Mornings',
    'Weekend Afternoons'
  ];

  const allGoals = [
    'Career Growth',
    'Personal Project',
    'Academic',
    'Creative Expression'
  ];

  const handleAddTeachSkill = (skillToAdd) => {
    const val = (skillToAdd || newTeachSkill).trim();
    if (val && !formData.canTeach.includes(val)) {
      setFormData(prev => ({ ...prev, canTeach: [...prev.canTeach, val] }));
      setNewTeachSkill('');
    }
  };

  const handleRemoveTeachSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      canTeach: prev.canTeach.filter(s => s !== skillToRemove)
    }));
  };

  const handleAddLearnSkill = (skillToAdd) => {
    const val = (skillToAdd || newLearnSkill).trim();
    if (val && !formData.wantsToLearn.includes(val)) {
      setFormData(prev => ({ ...prev, wantsToLearn: [...prev.wantsToLearn, val] }));
      setNewLearnSkill('');
    }
  };

  const handleRemoveLearnSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      wantsToLearn: prev.wantsToLearn.filter(s => s !== skillToRemove)
    }));
  };

  const toggleAvailability = (slot) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter(s => s !== slot)
        : [...prev.availability, slot]
    }));
  };

  const toggleGoal = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsProfileModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsProfileModalOpen(false)}>
      <div className="modal-container profile-modal-card" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-icon-badge">
              <User size={20} />
            </div>
            <div>
              <h2 className="modal-title">My Skill Profile & Matching Preferences</h2>
              <p className="modal-subtitle">Define what you teach and learn to power the Smart Matching Engine</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setIsProfileModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-form">
          {/* Basic Info */}
          <div className="form-row-2">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="input-field"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Professional Headline</label>
              <input
                type="text"
                className="input-field"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Software Engineer & AI Builder"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Short Bio</label>
            <textarea
              className="textarea-field"
              rows={2}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              placeholder="What are you currently working on or excited to learn?"
            />
          </div>

          {/* Skills You Can Teach (Offerings) */}
          <div className="form-section-box teach-section">
            <div className="section-label-group">
              <span className="badge badge-teach">TEACH WHAT YOU KNOW</span>
              <span className="section-hint">Skills you can barter or mentor others in</span>
            </div>

            <div className="tag-list">
              {formData.canTeach.map(skill => (
                <span key={skill} className="skill-chip teach-chip">
                  {skill}
                  <button type="button" onClick={() => handleRemoveTeachSkill(skill)} className="chip-remove">
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>

            <div className="input-with-button">
              <input
                type="text"
                className="input-field"
                placeholder="Add another skill you can teach (e.g. Python, Figma, Guitar)..."
                value={newTeachSkill}
                onChange={e => setNewTeachSkill(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTeachSkill();
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleAddTeachSkill()}
              >
                <Plus size={15} /> Add
              </button>
            </div>
          </div>

          {/* Skills You Want To Learn (Needs) */}
          <div className="form-section-box learn-section">
            <div className="section-label-group">
              <span className="badge badge-learn">LEARN WHAT YOU NEED</span>
              <span className="section-hint">Topics you are actively seeking peers to swap with</span>
            </div>

            <div className="tag-list">
              {formData.wantsToLearn.map(skill => (
                <span key={skill} className="skill-chip learn-chip">
                  {skill}
                  <button type="button" onClick={() => handleRemoveLearnSkill(skill)} className="chip-remove">
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>

            <div className="input-with-button">
              <input
                type="text"
                className="input-field"
                placeholder="Add a skill you want to learn (e.g. UI/UX Design, Video Editing)..."
                value={newLearnSkill}
                onChange={e => setNewLearnSkill(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddLearnSkill();
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleAddLearnSkill()}
              >
                <Plus size={15} /> Add
              </button>
            </div>
          </div>

          {/* Availability & Mode Preferences */}
          <div className="form-row-2">
            <div className="form-group">
              <label><Calendar size={14} /> Weekly Availability</label>
              <div className="checkbox-grid">
                {allAvailabilitySlots.map(slot => (
                  <label
                    key={slot}
                    className={`checkbox-pill ${formData.availability.includes(slot) ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.availability.includes(slot)}
                      onChange={() => toggleAvailability(slot)}
                    />
                    {slot}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label><Globe size={14} /> Learning Mode</label>
              <div className="radio-group-horizontal">
                {['Online', 'Hybrid', 'In-Person'].map(m => (
                  <label
                    key={m}
                    className={`radio-pill ${formData.mode === m ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, mode: m })}
                  >
                    {m}
                  </label>
                ))}
              </div>

              <div style={{ marginTop: '16px' }}>
                <label><Target size={14} /> Primary Goals</label>
                <div className="checkbox-grid">
                  {allGoals.map(goal => (
                    <label
                      key={goal}
                      className={`checkbox-pill ${formData.goals.includes(goal) ? 'selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.goals.includes(goal)}
                        onChange={() => toggleGoal(goal)}
                      />
                      {goal}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsProfileModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} /> Save & Recalculate Matches
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
