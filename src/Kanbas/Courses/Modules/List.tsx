import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  resetModule,
} from "./modulesReducer";
import { FaAngleDown, FaCheckCircle, FaPlus, FaEllipsisV, FaTrash, FaEdit } from 'react-icons/fa';
import './index.css';
import { KanbasState } from '../../store';

function ModuleList() {
  const { courseId } = useParams();
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const moduleList = useSelector((state: KanbasState) => 
  state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) => 
    state.modulesReducer.module);
  const dispatch = useDispatch();

  const toggleModule = (moduleId: string) => {
    setSelectedModuleId(selectedModuleId === moduleId ? null : moduleId);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="course-list-column">
          {/* Action Buttons */}
          <div className="module-actions d-flex justify-content-end mb-3">
            <button className="btn btn-formal btn-collapse me-2">Collapse All</button>
            <button className="btn btn-formal btn-view-progress me-2">View Progress</button>
            <button className="btn btn-formal btn-publish-all btn-success me-2"><i className="fa fa-check"></i> Publish All</button>
            <button className="btn btn-add-module btn-danger me-2">+ Module</button>
            <button className="btn btn-formal"><FaEllipsisV></FaEllipsisV></button>
          </div>
          <form className="d-flex">
            <div className="flex-grow-1 me-2">
              <input
                className="form-control mb-2"
                value={module.name}
                onChange={(e) =>
                  dispatch(setModule({ ...module, name: e.target.value }))
                }
              />
              <textarea
                className="form-control"
                value={module.description}
                onChange={(e) =>
                  dispatch(setModule({ ...module, description: e.target.value }))
                }
              />
            </div>
            <div>
              {
                !module._id ?
                <button className="btn btn-success me-2" onClick={() => dispatch(addModule({ ...module, course: courseId }))}>Add</button>
                :
                (
                  <div className="d-flex flex-column">
                    <button className="btn btn-primary mb-2" onClick={() => dispatch(updateModule(module))}>Update</button>
                    <button className="btn btn-danger" onClick={() => dispatch(resetModule())}>Cancel</button>
                  </div>
                )
              }
            </div>
          </form>

          <hr />

          {moduleList
            .filter((module) => module.course === courseId)
            .map(module => (
            <div key={module._id} className="module">
              <div className="module-header" onClick={() => toggleModule(module._id)}>
                <FaAngleDown className={`fa-angle-down icons ${selectedModuleId === module._id ? 'rotate' : ''}`} /> {module.name}
                <span className="module-icons float-end">
                  <FaCheckCircle className="text-success icons" />
                  <FaPlus className='icons'/>
                  <button
                    className="btn mx-0 px-0"
                    onClick={() => dispatch(deleteModule(module._id))}
                  >
                    <FaTrash className="icons"/>
                  </button>

                  <button
                    className="btn mx-0 px-0"
                    onClick={() => dispatch(setModule(module))}
                  >
                    <FaEdit className="icons"/>
                  </button>

                  <FaEllipsisV className='icons' />
                </span>
              </div>
              {selectedModuleId === module._id && (
                <div className="module-content">
                  {module.lessons?.map((lesson: { _id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
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
