import React, { useEffect, useState } from 'react';
import './App.css';
import ProjectTable from './components/ProjectTable';
import Pagination from './components/Pagination';

function App() {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json',
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setProjects(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentProjects = projects?.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="App">
            <h1>Highly-Rated Kickstarter Projects</h1>
            {isLoading ? (
                <div className="spinner"></div>
            ) : error ? (
                <div className="error">Error: {error}</div>
            ) : (
                <>
                    <ProjectTable projects={currentProjects} />
                    <Pagination
                        recordsPerPage={recordsPerPage}
                        totalRecords={projects?.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </>
            )}
        </div>
    );
}

export default App;
