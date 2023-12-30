class FileExplorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [], // Array to store uploaded files
      selectedFile: null // Track selected file for deletion
    };
  }

  handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    this.setState((prevState) => ({
      files: [...prevState.files, ...newFiles]
    }));
  };

  handleFileDelete = () => {
    const { files, selectedFile } = this.state;
    const updatedFiles = files.filter(file => file !== selectedFile);
    this.setState({
      files: updatedFiles,
      selectedFile: null
    });
  };

  handleFileSelect = (file) => {
    this.setState({ selectedFile: file });
  };

  render() {
    const { files, selectedFile } = this.state;

    return (
      <div>
        <h1>File Explorer</h1>
        <input type="file" onChange={this.handleFileUpload} multiple />
        
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <span onClick={() => this.handleFileSelect(file)}>
                {file.name}
              </span>
            </li>
          ))}
        </ul>

        <div>
          <button disabled={!selectedFile} onClick={this.handleFileDelete}>
            Delete Selected File
          </button>
          {/* You can add download functionality here */}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<FileExplorer />, document.getElementById('root'));
