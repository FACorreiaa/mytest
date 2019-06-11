import { Component, OnInit, Input } from '@angular/core'
import { ICategoryDto } from '@app/api/models/api-models'

@Component({
    selector: 'checklist',
    templateUrl: 'checklist.component.html',
    styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent implements OnInit {
    @Input() items: ICategoryDto
    @Input() toggleButton: boolean

    constructor() { }

    ngOnInit() { }

}
