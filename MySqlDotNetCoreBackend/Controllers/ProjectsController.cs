using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlDotNetCoreBackend.Models;
using System.Collections.Generic;
using System.Linq;

namespace MySqlDotNetCoreBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly UserContext _context;

        public ProjectsController(UserContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public ActionResult<IEnumerable<Project>> GetProjects()
        {
            return _context.Projects.ToList();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public ActionResult<Project> GetProject(int id)
        {
            var project = _context.Projects.Find(id);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        // POST: api/Projects
        [HttpPost]
        public ActionResult<Project> PostProject(Project project)
        {
            _context.Projects.Add(project);
            _context.SaveChanges();

            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }

        // PUT: api/Projects/5
        [HttpPut("{id}")]
        public IActionResult PutProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public IActionResult DeleteProject(int id)
        {
            var project = _context.Projects.Find(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
