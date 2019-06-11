import { Component, OnInit, Input } from '@angular/core'
import { ICategoryDto } from '@app/api/models/api-models'

@Component({
    selector: 'collapsible-button',
    templateUrl: 'collapsible-button.component.html',
    styleUrls: ['./collapsible-button.component.scss'],
})
export class CollapsibleButtonComponent implements OnInit {
    @Input() offerings: ICategoryDto[]

    constructor() { }

    ngOnInit() { }
}
