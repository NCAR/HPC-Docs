# Agile Methodology in CIRRUS

The CIRRUS team follows a **hybrid Agile Project Management** approach that combines elements of **Kanban** and <span title="Sequential project management methodology with distinct phases."><strong>Waterfall</strong></span>. This strategy helps to manage day-to-day work flexibly while tracking long-term progress and deliverables effectively.

## What is Agile Project Management?

Agile is a project management framework focused on:

- **Interaction and collaboration** over rigid processes  
- **Visibility** into project progress  
- Delivering a **working product** that aligns closely with user needs  

Agile emphasizes adaptability, short feedback loops, and iterative delivery to ensure the product evolves continuously based on stakeholder input.

## What is Waterfall?

Waterfall is a traditional, linear project management approach that breaks a project into sequential phases:

**[TODO: Add diagram here – requirements → design → implementation → testing → deployment]**

CIRRUS uses Waterfall to manage overall project status and track milestones and deliverables using <span title="Cloud-based work-management and collaboration platform."><strong>Smartsheet</strong></span>.  

It helps with planning and high-level visibility, especially for reporting progress to stakeholders.

## What is Kanban?

Kanban is a flexible Agile framework focused on **continuous delivery** and **visual management**.

- Work is broken down into small, trackable units called <span title="Short, simple description of a feature from the end-user perspective."><strong>User Stories</strong></span>.
- Each story is represented as a card on a <span title="Visual board that tracks work items through workflow stages."><strong>Kanban board</strong></span>, moving through defined stages (e.g., **Backlog → To Do → In Progress → Done**).  

- Kanban helps identify bottlenecks by limiting the number of tasks in each stage, also known as <span title="Maximum number of tasks allowed in a workflow stage."><strong>Work In Progress (WIP) limits</strong></span>.  
  
## What are User Stories?

**User Stories** describe a feature or task from the end user's perspective. They are:

- **Short and focused** – designed to be completed in a few days
- **Testable** – with clearly defined <span title="Testable conditions that must be met for a story to be complete."><strong>Acceptance Criteria</strong></span>  
  - **Iterative** – if a story is too large, it’s broken into smaller, more manageable pieces

Example User Story:

> *As a CIRRUS user, I want to understand what acceptance criteria is so that I can ensure my completed user story meets my expectations of "done."*

## What is Acceptance Criteria?

To ensure the User Story has a clear definition of "done," the Product Owner (PO) will define **Acceptance Criteria**. It is written from a user perspective and defines a requirement, why it is needed, and what expectations are for successful completion.

Example:

> *As a CIRRUS user, I want to understand what Acceptance Criteria is so that I can ensure my completed user story meets my expectations of done.*

## How do I interact with the team?

### Via the Agile Product Owner (PO)

All requests & questions can be directed to the PO for the project. **Nick Cote** (<ncote@ucar.edu>) is the Agile Product Owner for CIRRUS. The Agile PO's responsibility is representing the customer and stakeholder and is their interface to the development team. This allows the development team members to focus on delivering valuable working product while the customer is still being accurately represented via the PO. All requests directed at the PO will be turned into user stories on our Kanban Board.

### Kanban Board

Issues can also be created in **Jira** and added to our Kanban backlog. The PO will ensure your request is understood and has valid acceptance criteria. It will then be prioritized appropriately against other tasks in the queue.

The CIRRUS Kanban board currently implements the following story states:

| State       | Description                                                                    |
|-------------|--------------------------------------------------------------------------------|
| Backlog     | New stories that have not yet been fully reviewed and prioritized              |
| To Do       | Stories have been reviewed and prioritized                                     |
| Stalled     | Work is on hold for various reasons                                            |
| In Progress | A team member is actively working the Story                                    |
| In Review   | PO will check to make sure the Story Acceptance Criteria is met                |
| Done        | Acceptance Criteria has been verified successfully and the Story is complete   |

**[TODO: Add screenshot from the actual board for clarity]**

User Stories are self-assigned by a team member who wants to accomplish the task. A User Story will move from **To Do → In Progress** when it is at the top of the assignee's **To Do** list and they are ready to start. Kanban utilizes WIP limits to help identify bottlenecks and promote moving tasks to **Done**. The CIRRUS project has implemented the following WIP limits:

| Column       | Limit |
|--------------|-------|
| Stalled      | 4     |
| In Progress  | 6     |
| In Review    | 4     |

**[TODO: Add screenshot here to show the WIP limits]**

## Demonstrations

As new functionality is rolled out we will be taking advantage of different platforms to demonstrate working products to our stakeholders. Feedback is strongly desired during these demonstrations in order to ensure what the team is delivering is accurately meeting the user requirements. These interactions make sure the team is continuously improving.

## Retrospectives

Once a month the team will look back on the process overall. The focus will be on what has been working, what hasn't been working, and what improvements we should try in order to improve the process for our workflow.
