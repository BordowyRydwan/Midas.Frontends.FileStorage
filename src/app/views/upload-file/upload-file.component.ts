import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileParameter, FilesApiService } from "../../services/files/files.service";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  file?: File;
  visible: boolean = false;

  constructor(private fileApi: FilesApiService) {}

  ngOnInit(): void {
    window.addEventListener('reveal-upload' as keyof WindowEventMap, (customEvent: Event) => this.onReveal());
    window.addEventListener('hide-upload' as keyof WindowEventMap, (customEvent: Event) => this.onHide());
    window.addEventListener('clear-upload' as keyof WindowEventMap, (customEvent: Event) => this.onClear());
  }

  ngOnDestroy(): void {
    window.removeEventListener('reveal-upload' as keyof WindowEventMap, (customEvent: Event) => this.onReveal());
    window.removeEventListener('hide-upload' as keyof WindowEventMap, (customEvent: Event) => this.onHide());
    window.removeEventListener('clear-upload' as keyof WindowEventMap, (customEvent: Event) => this.onClear());
  }

  fileInputChange(input: any): void {
    this.file = input.target.files[0];
  }

  uploadFile(): void {
    if (!this.file) return;

    const model = {
      data: this.file,
      fileName: this.file.name
    } as FileParameter

    this.fileApi.addFile(model, "invoice")
      .subscribe({
        next: response => {
          if (!response.result.success) return;

          const evt = new CustomEvent<string>('file-upload', { detail: response.result.id });
          window.dispatchEvent(evt);
        }
      })
  }

  private onReveal(): void {
    this.visible = true;
    this.onClear();
  }

  private onHide(): void {
    this.visible = false;
    this.onClear();
  }

  private onClear(): void {
    this.file = undefined;
  }
}
