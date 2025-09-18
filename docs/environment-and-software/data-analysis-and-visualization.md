# Data analysis and visualization

Many data analysis and visualization software packages are freely
available for use on CISL-managed resources. These packages include some
developed and supported by NCAR and CISL.

## Frequently used packages

These are among the more frequently used data analysis and visualization
packages available on NCAR systems. To request installation of other
packages, contact the [NCAR Research Computing help desk](https://rchelp.ucar.edu/).

### **GrADS**
The Grid Analysis and Display System
([GrADS](http://cola.gmu.edu/grads/)) is an interactive desktop tool
for visualizing earth science data.

### **IDL**
IDL is Interactive Data Language, which is used for data
visualization and analysis. Documentation is
available [here](https://www.harrisgeospatial.com/Software-Technology/IDL).

### **MATLAB**
??? danger "Please follow these license use guidelines for Matlab"
    The CISL user community shares a limited number of licenses for
    running MATLAB, MATLAB Toolboxes, and some other applications.

    Follow these guidelines to ensure fair access for all users:

    - Avoid monopolizing these licenses.

    - If you need to use multiple licenses at one time, be considerate of
      others and finish your session as quickly as possible.

    - Close applications when you are done to free up licenses for others to
      use.

    CISL reserves the right to kill jobs/tasks of users who monopolize these
    licenses.

    To see how many licenses are being used, run **licstatus** at your
    command line. You will see columns showing how many licenses you're
    using, the total number of licenses in use, and the total number of
    licenses.
    ```bash
    licstatus
    ```

This is a high-level language and interactive environment
for data analysis, statistics, and image processing. Several MATLAB
toolboxes are provided (list below). See
the [MathWorks](https://www.mathworks.com/products/matlab/) web site
for documentation and note the information just below about Octave, an
alternative to MATLAB. **Related:** [MATLAB Parallel Computing Toolbox](./matlab-parallel-computing-toolbox.md)

!!! info "MATLAB toolboxes"
    - Image Processing Toolbox
    - Mapping Toolbox
    - MATLAB Compiler
    - Neural Network Toolbox
    - Optimization Toolbox
    - Parallel Computing Toolbox
    - Signal Processing Toolbox
    - Statistics Toolbox
    - Wavelet Toolbox

### **MATLAB alternative - Octave**
Many MATLAB codes run with very little or no modification
under [Octave](https://www.gnu.org/software/octave/), a free
interactive data analysis software package with syntax and
functionality that are similar to MATLAB's. Since using Octave is not
constrained by license issues, we encourage MATLAB users to try it,
particularly those who have long-running MATLAB jobs. Depending on
compute intensity, Octave usually runs slower than MATLAB but it may
be suitable for most data analysis work and you won't risk having jobs
killed because of a lack of licenses.

To use Octave interactively, start an interactive job and load the
module.
```pre
module load octave
```
Run `octave` to start the command line interface, or run the
following command to use the GUI.
```bash
octave --force-gui
```

### **NCL**
NCAR Command Language is an interpreted language that CISL
designed for scientific data analysis and visualization.

### **ParaView**`*`
This is an open-source application for building
visualizations and analyzing data, either interactively in 3D or
through batch processing.
See [ParaView.org](http://www.paraview.org/) for documentation.


### **PyNGL and PyNIO**
[Python packages](http://www.pyngl.ucar.edu/) that CISL developed for
scientific visualization, file input/output, and data analysis.

### **VAPOR**`*`
The Visualization and Analysis Platform for Ocean,
Atmosphere, and Solar Researchers is a desktop platform that provides
an interactive 3D visualization environment for exploring geosciences
CFD data sets. See [VAPOR](https://www.vapor.ucar.edu/).

---

Many additional applications and tools that are commonly used by
atmospheric and Earth system scientists are available on NCAR HPC
resources and through the [CISL Research Data Archive](https://rda.ucar.edu/). These
include [Mathematica](http://www.wolfram.com/mathematica/), [Vis5d](http://vis5d.sourceforge.net/),
and [VTK](https://vtk.org/).

---
<p style="font-size:0.75em; "><em>Those marked with an asterisk should be run only on the Casper nodes
because of their graphics and GPU requirements. Others can be used on
Derecho. Check the man pages for any program to get additional
information.
</em></p>


---

## Advanced visualization support

Researchers who need help visualizing data to demonstrate the results of
their scientific computing can request expert assistance and
collaboration from CISL. This service is available to researchers who
want help using specialized applications on data analysis and
visualization resources that CISL manages.

![](media/image1.png)

CISL visualization staff have particular expertise in CISL-developed
software such as VAPOR and NCL but are open to assisting with other
applications. They have helped science teams produce numerous
visualizations for conferences, publications, and scientific journals as
well as science and broadcast news programs.

See these sites for some examples:

- [CISL Visualization Gallery](https://visgallery.ucar.edu/)

- [NCAR VisLab YouTube Channel](https://www.youtube.com/user/ucarvets/videos)


### Requesting support

To ask for assistance, please use [**this request form**](https://docs.google.com/forms/d/e/1FAIpQLSdPDRkiPkEmaTVyEgE9MAPBqjj0jBiZiM4eP2FDV-p_fKJRkQ/viewform).
Indicate clearly that the request is for "Advanced Visualization
Support" and describe how the proposed visualization project meets the
following criteria:

- The assistance will culminate in a visualization deliverable or
  deliverables within a defined time period.

- The deliverable(s) will help demonstrate science results and findings.

- A member or members of the science team will participate actively in
  the production of the deliverable(s).

- Data to be visualized must have been generated on a CISL
  high-performance computing system.

- CISL data analysis and visualization resources will be used in
  creating the deliverables.

Requests for advanced visualization support are evaluated based on those
criteria to ensure the most productive use of the limited available
staff time. To further help us evaluate your request, please briefly
address the following questions when submitting the request form:

1.  What does the scientist want to communicate about the data with a
    visualization?

2.  What type of visualization is needed (2D or 3D animation, still
    images)?

3.  What model or instrument produced the data?

4.  How big are the data?

5.  In what file format are the data stored?

The CISL visualization staff will follow up with requesters directly if
additional details are needed.

### Starting visualization applications

CISL visualization experts can help as described above
with *using* applications such as NCL and VAPOR.

See the [Casper documentation](../../compute-systems/casper/remote-desktops/) to
learn how to submit the necessary jobs and *start* the applications on
that data analysis and visualization cluster.
