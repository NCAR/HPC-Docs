# Data analysis and visualization

Many data analysis and visualization software packages are freely
available for use on CISL-managed resources. These packages include some
developed and supported by NCAR and CISL.

Please follow the license use guidelines as noted below.

#### Page contents

- [License use guidelines](#Dataanalysisandvisualization-guidelines)

- [Frequently used packages](#Dataanalysisandvisualization-Frequently)

## License use guidelines

The CISL user community shares a limited number of licenses for
running MATLAB, MATLAB Toolboxes, and some other applications.

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

licstatus

## Frequently used packages

These are among the more frequently used data analysis and visualization
packages available on NCAR systems. To request installation of other
packages, contact the [<u>NCAR Research Computing help
desk</u>](https://rchelp.ucar.edu/).

- **GrADS** – The Grid Analysis and Display System
  ([GrADS](http://cola.gmu.edu/grads/)) is an interactive desktop tool
  for visualizing earth science data.  
   

- **IDL** – IDL is Interactive Data Language, which is used for data
  visualization and analysis. Documentation is
  available [here](https://www.harrisgeospatial.com/Software-Technology/IDL).

- **MATLAB** – This is a high-level language and interactive environment
  for data analysis, statistics, and image processing. Several MATLAB
  toolboxes are provided (list at right). See
  the [MathWorks](https://www.mathworks.com/products/matlab/) web site
  for documentation and note the information just below about Octave, an
  alternative to MATLAB.  
    
  **Related:** [MATLAB Parallel Computing Toolbox on Casper and
  Cheyenne](file:////display/RC/MATLAB+Parallel+Computing+Toolbox+on+Casper+and+Cheyenne)

- **MATLAB alternative - Octave**

> Many MATLAB codes run with very little or no modification
> under [Octave](https://www.gnu.org/software/octave/), a free
> interactive data analysis software package with syntax and
> functionality that are similar to MATLAB's. Since using Octave is not
> constrained by license issues, we encourage MATLAB users to try it,
> particularly those who have long-running MATLAB jobs. Depending on
> compute intensity, Octave usually runs slower than MATLAB but it may
> be suitable for most data analysis work and you won't risk having jobs
> killed because of a lack of licenses.
>
> To use Octave interactively, start an interactive job and load the
> module.
>
> module load octave
>
> Run **octave** to start the command line interface, or run the
> following command to use the GUI.
>
> octave --force-gui

- **NCL** – NCAR Command Language is an interpreted language that CISL
  designed for scientific data analysis and visualization.

- **ParaView**\* – This is an open-source application for building
  visualizations and analyzing data, either interactively in 3D or
  through batch processing.
  See [ParaView.org](http://www.paraview.org/) for documentation.  
   

- **PyNGL and PyNIO** – [Python
  packages](http://www.pyngl.ucar.edu/) that CISL developed for
  scientific visualization, file input/output, and data analysis.  
   

- **VAPOR**\* – The Visualization and Analysis Platform for Ocean,
  Atmosphere, and Solar Researchers is a desktop platform that provides
  an interactive 3D visualization environment for exploring geosciences
  CFD data sets. See [VAPOR](https://www.vapor.ucar.edu/).

Many additional applications and tools that are commonly used by
atmospheric and Earth system scientists are available on NCAR HPC
resources and through the [CISL Research Data
Archive](https://rda.ucar.edu/). These
include [Mathematica](http://www.wolfram.com/mathematica/), [Vis5d](http://vis5d.sourceforge.net/),
and [VTK](https://vtk.org/).

**MATLAB toolboxes**

Image Processing Toolbox

Mapping Toolbox

MATLAB Compiler

Neural Network Toolbox

Optimization Toolbox

Parallel Computing Toolbox

Signal Processing Toolbox

Statistics Toolbox

Wavelet Toolbox

\* Those marked with an asterisk should be run only on the Casper nodes
because of their graphics and GPU requirements. Others can be used on
Cheyenne. Check the man pages for any program to get additional
information.
