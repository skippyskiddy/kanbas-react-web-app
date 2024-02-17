import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { modules } from '../../Database';
import { FaAngleDown, FaCheckCircle, FaPlus, FaEllipsisV } from 'react-icons/fa';
import './index.css';

function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter(module => module.course === courseId);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const toggleModule = (moduleId: string) => {
    setSelectedModuleId(selectedModuleId === moduleId ? null : moduleId);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 course-list-column">
          {/* Action Buttons */}
          <div className="module-actions d-flex justify-content-end mb-3">
            <button className="btn btn-formal btn-collapse me-2">Collapse All</button>
            <button className="btn btn-formal btn-view-progress me-2">View Progress</button>
            <button className="btn btn-formal btn-publish-all btn-success me-2"><i className="fa fa-check"></i> Publish All</button>
            <button className="btn btn-add-module btn-danger me-2">+ Module</button>
            <button className="btn btn-formal"><FaEllipsisV></FaEllipsisV></button>
          </div>
          <hr />
          {modulesList.map(module => (
            <div key={module._id} className="module">
              <div className="module-header" onClick={() => toggleModule(module._id)}>
                <FaAngleDown className={`fa-angle-down icons ${selectedModuleId === module._id ? 'rotate' : ''}`} /> {module.name}
                <span className="module-icons float-end">
                  <FaCheckCircle className="text-success icons" />
                  <FaPlus className='icons'/>
                  <FaEllipsisV className='icons' />
                </span>
              </div>
              {selectedModuleId === module._id && (
                <div className="module-content">
                  {module.lessons?.map(lesson => (
                    <div key={lesson._id} className="module-item">
                      {lesson.name} <FaCheckCircle className="text-success float-end" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModuleList;
