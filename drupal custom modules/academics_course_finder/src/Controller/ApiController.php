<?php

namespace Drupal\academics_course_finder\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Connection;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\taxonomy\Entity\Term;

/**
 * Returns responses for Academics Course Finder Program routes.
 */
class ApiController extends ControllerBase {

  /**
   * The database connection..
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $connection;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('database'),
    );
  }

  /**
   * Constructs a Controller.
   */
  public function __construct(Connection $connection) {
    $this->connection = $connection;
  }

  /**
   * Builds the response for Programs.
   */
  public function programs() {
    $dataset = $this->getProgramsDataSet();
    return new JsonResponse($dataset);
  }

  /**
   * Returns array of data for Finder list.
   *
   * @return array[]
   */
  private function getProgramsDataSet() {
    $result = [];
    try {
      $vid = 'programs_and_areas_of_study';
      $terms =\Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($vid);

      if ($terms) {
        foreach ($terms as $i => $term) {
          $programs = \Drupal::entityTypeManager()->getStorage('node')->loadByProperties(['field_programs_and_areas_of_stud' => $term->tid]);
          $node_sorting = $item = $details_object = [];

          $keywords = [];
          $summary = '';
          $details = [];
          $college_name = [];
          $academic_departments = [];
          $all_departments = [];
          $location_name = '';
          $program_type_name = '';
          $program_all_types = [];
          $all_locations = [];
          $subject_area = [];
          $all_subjects = [];
              
          if($programs) {
            foreach($programs as $n => $node) {

              if(isset($node->get('field_search_keywords')->getValue()[0])) {
                $keywords[] = $node->get('field_search_keywords')->getValue()[0]['value'];
              }

              if(isset($node->get('field_summary')->getValue()[0])) {
                $summary = $node->get('field_summary')->getValue()[0]['value'];
              }

              if(isset($node->get('field_program_type')->target_id)) {
                $program_type_name = \Drupal\taxonomy\Entity\Term::load($node->get('field_program_type')->target_id)->get('name')->value;
                $program_all_types[] = \Drupal\taxonomy\Entity\Term::load($node->get('field_program_type')->target_id)->get('name')->value;
              }

              if(isset($node->get('field_college')->target_id)) {
                $college_name[] = \Drupal\taxonomy\Entity\Term::load($node->get('field_college')->target_id)->get('name')->value;
              }

              if(isset($node->get('field_a_department')->target_id)) {           
                $academic_departments_ids = $node->get('field_a_department')->referencedEntities(); 
                $academic_departments = $this->getTermNamesList($academic_departments_ids);
                $all_departments = array_merge($all_departments, $academic_departments); 
              }

              if(isset($node->get('field_subject_area')->target_id)) {           
                $subject_area_ids = $node->get('field_subject_area')->referencedEntities(); 
                $subject_area = $this->getTermNamesList($subject_area_ids);
                $all_subjects = array_merge($all_subjects, $subject_area); 
              }

              if(isset($node->get('field_p_location')->target_id)) {           
                $location_ids = $node->get('field_p_location')->referencedEntities(); 
                $location_name = $this->getTermNames($location_ids); 
                $location_list = $this->getTermNamesList($location_ids);
                $all_locations = array_merge($all_locations, $location_list);
              }

              $item['name'] = $node->getTitle();
              $item['location'] = str_replace('"', "", $location_name);
              $item['modality'] = 'Modality';
              $item['description'] = $summary;
              $item['link'] = \Drupal::service('path_alias.manager')->getAliasByPath('/node/' . $node->id());
              
              $node_sorting[$program_type_name]['section'] = $program_type_name;
              $node_sorting[$program_type_name]['items'][] = $item;
            }
            
            if($node_sorting) {
              foreach($node_sorting as $i => $program) {
                $details_object[] = $program; 
              }
            }
            $result[] = [
              "name" => $term->name,
              "keywords" => $keywords,
              "type" => $program_all_types,
              "college" => $college_name,
              "department" => $all_departments,
              "subject" => $all_subjects,
              "location" => $all_locations,
              "details" => $details_object
            ];
          }
          
        }
      }
    }
    catch (\Exception $e) {
      $this->getLogger('program')->error($this->t('program finder: @msg.', ['@msg' => $e->getMessage()]));
    }

    return $result;
  }

  
  /**
   * Returns string of terms.
   *
   * @param array $terms
   *
   * @return string
   */
  private function getTermNames($terms): string {
    $res = '';
    if($terms) {
      foreach($terms as $term) {
        $res .= '"'.$term->getName().'", ';        
      }
    }
    return rtrim($res, ", ");
  }
  
  /**
   * Returns list of terms.
   *
   * @param array $terms
   *
   * @return array
   */
  private function getTermNamesList($terms): array {
    $res = [];
    if($terms) {
      foreach($terms as $term) {
        $res[] = $term->getName();        
      }
    }
    return $res;
  }
}
