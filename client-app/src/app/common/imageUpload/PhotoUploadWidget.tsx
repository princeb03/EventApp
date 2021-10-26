import { Fragment, useEffect, useState } from "react";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

export default function PhotoUploadWidget() {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => console.log(blob));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files]);

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header color='teal'
                    content='Step 1 - Add Photo' 
                    sub/>
                    <PhotoWidgetDropzone setFiles={setFiles}/>
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header color='teal'
                    content='Step 2 - Resize image' 
                    sub/>
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header color='teal'
                    content='Step 3 - Preview and Upload' 
                    sub/>
                {files && files.length > 0 && 
                <Fragment>
                    <div className='img-preview' style={{minHeight: 200, overflow: "hidden"}} />
                    <Button.Group widths={2}>
                        <Button onClick={onCrop} positive icon='check' />
                        <Button onClick={() => setFiles([])} icon='close' />
                    </Button.Group>
                </Fragment> 
                }
                
            </Grid.Column>
        </Grid>
    );
}